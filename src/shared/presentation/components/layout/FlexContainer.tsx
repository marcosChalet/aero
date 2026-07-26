interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function FlexContainer({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`flex h-full max-h-275 w-fit max-w-120 min-w-100 flex-1 items-center justify-center overflow-auto bg-gray-200/30 p-5 ${className}`}
    >
      {children}
    </div>
  );
}
