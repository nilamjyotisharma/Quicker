import React from 'react'
import CategoryItems from './CategoryItems'
import CategoryList from './Constants/Constants'

const Categories = () => {
  return (
    <>

        {CategoryList.map((item) => {
            return (
            

                <CategoryItems key={item.id} name={item.name} image={item.image} />

                
                
            )
        })}

    </>
  )
}

export default Categories