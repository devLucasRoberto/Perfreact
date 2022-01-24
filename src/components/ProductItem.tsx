import { memo, useState } from 'react'
import { AddProductToWishListProps } from './AddProductToWishList'
import dynamic from 'next/dynamic'
import lodash from 'lodash'

// import { AddProductToWishList } from './AddProductToWishList'
const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import('./AddProductToWishList').then(
      mod => mod.AddProductToWishList
    )
  },
  {
    loading: () => <span>Carregando...</span>
  }
) // carregar a biblioteca sobre demanda

interface ProductItemProps {
  product: {
    id: number
    price: number
    priceFormatted: string
    title: string
  }
  onAddToWishList: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingWishlist, setIsAddingWishlist] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingWishlist && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product)
  }
)
