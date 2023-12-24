import React from 'react'
import logoMain from '../../Images/logoBG2.png'

const Loader = () => {
  return (
    <div class="shadow text-center rounded-md mx-auto px-24 w-full h-screen my-16">
    <div class="animate-pulse bg-gray-400 h-[14rem] w-full"></div>
    <div class="animate-pulse flex space-x-4 mt-8">
    <div class="rounded-full bg-gray-400 h-24 w-24"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-gray-400 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-gray-400 rounded col-span-2"></div>
          <div class="h-2 bg-gray-400 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-gray-400 rounded"></div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Loader