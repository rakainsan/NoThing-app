export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="h-4 bg-gray-100 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-5/6" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="h-3 bg-gray-100 rounded-full w-16" />
      </div>
    </div>
  )
}