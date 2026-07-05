import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function SectionHeader({ title, description, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
