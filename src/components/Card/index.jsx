import React from 'react'

const Card = ({title, subtitle}) => {
  return (
    <div class="flex-1 p-3 bg-white border border-gray-200 rounded-lg shadow">
        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900">{title}</h5>
        <p class="font-normal text-gray-700">{subtitle}</p>
    </div>
  )
}

export default Card;