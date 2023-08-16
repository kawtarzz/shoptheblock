const handleSearch = () => {
  if (searchTerm === "") {
    getProducts().then(setProducts);
  } else {
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // sets the state to the filtered results
    setProducts(searchResults);
  }
};

const sortProducts = (products) => {
  return (
    <div className="p-4 me-auto inline">
      <Row>
        <Col sm={2}>
          <Label htmlFor="label-text">Sort by: </Label>
          <Button onClick={() => {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price)
            setProducts(sortedProducts)
          }}>
            <b>Price:</b> Lowest first
          </Button>
        </Col>
      </Row>
    </div>

  )
}

const searchProducts = () => {
  return (
    <div className="p-4 me-auto inline">

      <Row>
        <Col>
          <Label htmlFor="label-text">
            Search:
          </Label>
          <Input className="me-auto"
            placeholder="Search for a product"
            value={searchTerm}
            onChange={(evt) => setSearchTerm(evt.target.value)} />

          <Button variant="secondary" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>
    </div>

  )
}
