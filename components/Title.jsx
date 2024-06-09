const Title = ({ product }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold capitalize text-black dark:text-white">{product?.name}</h1>
      <div className="flex justify-between">
        <div
          className="flex items-center mt-2 space-x-2 text-lg text-slate-500 dark:text-gray-300"
        >
          {product?.listings == 1 ? 'Quantity:' : 'Quantity:'} {product?.listings}
        </div>
      </div>
    </div>
  )
}

export default Title
