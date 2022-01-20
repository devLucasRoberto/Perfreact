import { useMemo } from 'react'
import { List, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from './ProductItem'

interface SearchResultsProps {
  totalPrice: number
  results: Array<{
    id: number
    price: number
    priceFormatted: string
    title: string
  }>
  onAddToWishList: (id: number) => void
}

export function SearchResults({
  totalPrice,
  results,
  onAddToWishList
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    // sempre colocar uma div em volta
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5} //quantos itens para aplicação deixar carregado, quanto para cima e para baixo
        rowCount={results.length} // quantos itens tem na lista
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        )
      })} */}
    </div>
  )
}
