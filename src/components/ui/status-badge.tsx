import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType = "pending" | "completed" | "cancelled" | "default" | "success" | "warning" | "destructive"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  label?: string
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  const variants: Record<StatusType, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    completed: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    default: "bg-muted text-muted-foreground hover:bg-muted",
    success: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }

  const defaultLabels: Record<StatusType, string> = {
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",
    default: "Desconocido",
    success: "Éxito",
    warning: "Alerta",
    destructive: "Error",
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("border-transparent font-medium", variants[status], className)}
      {...props}
    >
      {label || defaultLabels[status]}
    </Badge>
  )
}
