export const LessonItemSkeleton = () => (
  <div className="bg-gray-200 p-4 rounded-xl shadow-md animate-pulse space-y-3">
    <div className="h-5 w-1/3 bg-gray-300 rounded" />
    <div className="h-4 w-1/2 bg-gray-300 rounded" />
    <div className="h-4 w-1/4 bg-gray-300 rounded" />
  </div>
);

export const StudentLessonItemSkeleton = () => (
  <div className="bg-gray-200 p-2 rounded-xl shadow-md animate-pulse flex items-center space-x-2">
    <div className="h-10 w-10 bg-gray-300 rounded-xl" />
    <div className="border w-full space-y-2">
      <div className="h-4 w-1/2 bg-gray-300 rounded" />
      <div className="h-2 w-1/2 bg-gray-300 rounded" />
    </div>
  </div>
);
