type Props = {
  title: string;
  description?: string;
};

export default function ToolSidebarHeader({ title, description }: Props) {
  return (
    <div className="p-4 border-b space-y-1 h-[68px]">
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
    </div>
  );
}
