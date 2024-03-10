const ProfileInfoSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center mb-16">
        <div className="w-[48px] h-[48px] rounded-[50%] overflow-hidden mr-4 bg-skeleton-primary" />
        <div className="flex flex-col">
          <div className="w-[150px] h-[24px] bg-skeleton-primary rounded-md mb-2" />
          <div className="w-[150px] h-[20px] bg-skeleton-primary rounded-md" />
        </div>
      </div>
      <div className="flex gap-6 mb-16">
        <div className="w-[320px] card-border card-bg px-5 py-3">
          <div className="w-[60px] h-[20px] mb-3 flex items-center bg-skeleton-primary rounded-md" />
          <div className="flex flex-col">
            <div className="mb-2">
              <div className="w-[100px] h-[20px] rounded-md bg-skeleton-primary" />
            </div>
            <div className="flex">
              <div className="w-[100px] h-[20px] rounded-md bg-skeleton-primary" />
            </div>
          </div>
        </div>
        <div className="w-[320px] card-border card-bg px-5 py-3">
          <div className="w-[60px] h-[20px] mb-3 flex items-center bg-skeleton-primary rounded-md" />
          <div className="flex flex-col">
            <div className="mb-2">
              <div className="w-[100px] h-[20px] rounded-md bg-skeleton-primary" />
            </div>
            <div className="flex">
              <div className="w-[100px] h-[20px] rounded-md bg-skeleton-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoSkeleton
