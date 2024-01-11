import { Skeleton } from "@/app/components";
import { Card } from "@radix-ui/themes";

const UserFormSkeleton = () => {
  return (
    <div className=' flex flex-row justify-center  '>
        <div className='flex  flex-col items-center !h-64  md:w-2/5 rounded-2xl border .border-4'>
          <Skeleton className='!h-8  !w-96  mt-20' />
          <Skeleton className='!h-8 !w-96 mt-10' />
        </div>
        </div>
  );
};

export default UserFormSkeleton;

