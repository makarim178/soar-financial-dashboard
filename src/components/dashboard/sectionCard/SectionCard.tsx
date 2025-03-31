import { JSX, useMemo } from "react"

const SectionCard = ({ title, children }: { 
    title: string
    children: JSX.Element | JSX.Element[]
}) => {
    const id = useMemo<string>(() => `${title.toLowerCase().replaceAll(' ', '-')}-heading`, [title])
  return (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-title" id={id}>{title}</h3>
        <div className="bg-white rounded-3xl md:shadow p-6" tabIndex={0} role="region" aria-labelledby={id}>
        <div className="space-y-4">
            { children }
        </div>        
      </div>
    </div>
  )
}

export default SectionCard
