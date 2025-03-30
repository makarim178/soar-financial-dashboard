import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { createUser } from '@/src/lib/db/users';
import { ensureDirectoryExists } from '@/src/lib/db/index';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
ensureDirectoryExists(dataDir);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const userName = formData.get('userName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const dob = formData.get('dob') as string;
    const presentAddress = formData.get('presentAddress') as string;
    const permanentAddress = formData.get('permanentAddress') as string || null;
    const city = formData.get('city') as string;
    const postalCode = formData.get('postalCode') as string;
    const country = formData.get('country') as string;
    
    // Handle profile image
    let profileImagePath = null;
    const profileImage = formData.get('profileImage') as File;
    
    if (profileImage && profileImage.size > 0) {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      const fileName = `${Date.now()}-${profileImage.name}`;
      const uploadsDir = path.join(dataDir, 'uploads');
      ensureDirectoryExists(uploadsDir);
      
      const imagePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(imagePath, buffer);
      profileImagePath = `/uploads/${fileName}`;
    }
    
    // Prepare user data
    const userData = {
      name,
      userName,
      email,
      password,
      dob,
      presentAddress,
      permanentAddress,
      city,
      postalCode,
      country,
      profileImage: profileImagePath,
      createdAt: new Date().toISOString()
    };
    
    // Insert user data
    const result = await createUser(userData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'User created successfully',
      userId: result.lastID 
    });
  } catch (error: Error | unknown) {
    console.error('Error saving user data:', error);
    
    // Handle unique constraint violations
    if (error instanceof globalThis.Error && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to save user data' },
      { status: 500 }
    );
  }
}
