import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, { useState } from 'react'
import styles from '../styles/ProductList.module.css'

function categoryFilter({ products, updateCategory }) {
  const [selected, setSelected] = useState();
  let categories = new Set(products.map(pro => pro.category))
  categories = Array.from(categories)
  categories.unshift('All')

  return (
    <Dropdown
      className={styles.filter}
      options={categories}
      onChange={(value) => updateCategory(value.value)}
      placeholder="Select a Category" />
  )
}

export default categoryFilter
