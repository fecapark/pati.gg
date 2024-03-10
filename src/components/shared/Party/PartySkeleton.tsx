const PartySkeleton = () => {
  return (
    <div className="animate-pulse card-border card-bg h-[130px] w-full px-6 py-4">
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-2 mb-3 w-[160px] h-[24px] bg-skeleton-primary rounded-md" />
        <div className="flex items-center gap-2">
          <div className="w-[50px] h-[30px] bg-skeleton-primary rounded-lg" />
          <div className="w-[62px] h-[30px] bg-skeleton-primary rounded-lg" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="font-semibold text-lg mb-2 w-[200px] h-[28px] bg-skeleton-primary rounded-md" />
        <div className="flex gap-2 flex-wrap">
          <div className="w-[55px] h-[24px] rounded-[4px] bg-skeleton-primary" />
          <div className="w-[55px] h-[24px] rounded-[4px] bg-skeleton-primary" />
        </div>
      </div>
    </div>
  )
}

export default PartySkeleton
