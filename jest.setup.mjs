// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock the fetch API
import { jest } from '@jest/globals';
import React from 'react';

// Mock Response
global.Response = class Response {
  status;
  statusText;
  headers;
  body;
  ok;

  constructor(body, options = {}) {
    this.body = body || '';
    this.status = options.status || 200;
    this.statusText = options.statusText || '';
    this.headers = new Headers(options.headers || {});
    this.ok = this.status >= 200 && this.status < 300;
  }

  json() {
    return Promise.resolve(typeof this.body === 'string' ? JSON.parse(this.body) : this.body);
  }

  text() {
    return Promise.resolve(typeof this.body === 'string' ? this.body : JSON.stringify(this.body));
  }
};

global.fetch = jest.fn(() => {
  return Promise.resolve(new Response());
});

// Mock Request and other web APIs for Next.js route handlers
global.Request = class Request {
  url;
  method;
  body;
  headers;

  constructor(url, options = {}) {
    this.url = url;
    this.method = options.method || 'GET';
    this.body = options.body || null;
    this.headers = new Headers(options.headers || {});
  }

  json() {
    return Promise.resolve(
      typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    );
  }
};

// Mock Headers if not already defined
if (!global.Headers) {
  global.Headers = class Headers {
    headers = {};

    constructor(init) {
      if (init) {
        Object.keys(init).forEach(key => {
          this.headers[key.toLowerCase()] = init[key];
        });
      }
    }

    get(name) {
      return this.headers[name.toLowerCase()] || null;
    }

    set(name, value) {
      this.headers[name.toLowerCase()] = value;
    }
  };
}

// Mock URL
class MockURL {
  href;
  origin;
  protocol;
  username;
  password;
  host;
  hostname;
  port;
  pathname;
  search;
  hash;
  searchParams;

  constructor(url) {
    this.href = url;
    this.origin = 'http://localhost:3000';
    this.protocol = 'http:';
    this.username = '';
    this.password = '';
    this.host = 'localhost:3000';
    this.hostname = 'localhost';
    this.port = '3000';
    this.pathname = url.split('?')[0];
    this.search = url.includes('?') ? `?${url.split('?')[1]}` : '';
    this.hash = '';
    this.searchParams = new URLSearchParams(this.search);
  }
}

// Override URL constructor
global.URL = MockURL;

// Mock URLSearchParams if not already defined
if (!global.URLSearchParams) {
  global.URLSearchParams = class URLSearchParams {
    params = new Map();

    constructor(init) {
      if (init) {
        const query = init.startsWith('?') ? init.slice(1) : init;
        query.split('&').forEach(pair => {
          if (pair) {
            const [key, value] = pair.split('=');
            this.params.set(key, value || '');
          }
        });
      }
    }

    get(name) {
      return this.params.get(name) || null;
    }
  };
}

// Mock Chart.js to avoid canvas rendering issues in tests
jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  ArcElement: jest.fn(),
  LineElement: jest.fn(),
  BarElement: jest.fn(),
  PointElement: jest.fn(),
  RadarElement: jest.fn(),
  ScatterElement: jest.fn(),
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  LogarithmicScale: jest.fn(),
  RadialLinearScale: jest.fn(),
  TimeScale: jest.fn(),
  TimeSeriesScale: jest.fn(),
  Decimation: jest.fn(),
  Filler: jest.fn(),
  Legend: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  SubTitle: jest.fn(),
  register: jest.fn(),
}));

// Mock react-chartjs-2 components
jest.mock('react-chartjs-2', () => ({
  Line: function LineChart() {
    return React.createElement('div', { 'data-testid': 'line-chart' }, 'Line Chart');
  },
  Bar: function BarChart() {
    return React.createElement('div', { 'data-testid': 'bar-chart' }, 'Bar Chart');
  },
  Pie: function PieChart() {
    return React.createElement('div', { 'data-testid': 'pie-chart' }, 'Pie Chart');
  },
  Doughnut: function DoughnutChart() {
    return React.createElement('div', { 'data-testid': 'doughnut-chart' }, 'Doughnut Chart');
  },
}));
