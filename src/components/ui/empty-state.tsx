import { cn } from "@/lib/utils"
import { FolderSearch } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action, 
  className, 
  ...props 
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
        {icon || <FolderSearch className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}
