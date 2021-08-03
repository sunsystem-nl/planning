const orderProducts = products => (
	products.sort((a, b) => a.productNaamSingular.localeCompare(b.productNaamSingular))
)

export const productSelectField = (selectedProduct, register, setSelectedProduct, products, aantal) => {
	return <div className='form-row mt-3'>
		<div className='form-group col-12'>
			<label htmlFor='product'>Product</label>
			<select
				className="form-control w-100"
				id="productNaam"
				name={'productNaam'}
				ref={register}
				onChange={e => setSelectedProduct(e.target.value)}
			>
				{products && orderProducts(products).map((prod, index) => <option key={index} value={prod.productNaamSingular} selected={selectedProduct && (selectedProduct === prod.productNaamSingular || selectedProduct === prod.productNaamPlural)}>{parseInt(aantal) === 1 ? prod.productNaamSingular : prod.productNaamPlural}</option>)}
			</select>
		</div>
	</div>
}
