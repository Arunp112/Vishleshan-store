import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

const Filter = () => {
  const context = useContext(myContext)
  const {
    mode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product,
  } = context

  const categories = [ 'phones', 'laptops', 'food']

  return (
    <div className="container mx-auto px-4 mt-5">
      <div
        className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <div className="relative">
          <div className="absolute flex items-center ml-2 h-full">
            <svg
              className="w-4 h-4 fill-current text-primary-gray-dark"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.8898 15.0493L11.8588 11.0182..." />
            </svg>
          </div>
          <input
            type="text"
            name="searchkey"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            id="searchkey"
            placeholder="Search here"
            className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Filters</p>
          <button
            onClick={() => {
              setSearchkey('')
              setFilterType('')
              setFilterPrice('')
            }}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            style={{ color: mode === 'dark' ? 'white' : '' }}
          >
            Reset Filter
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {/* Category Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 text-sm"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Price Dropdown */}
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 text-sm"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <option value="">All Prices</option>
            {[...new Set(product.map((p) => p.price))].map((price, index) => (
              <option key={index} value={price}>
                ₹{price}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filter
