import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, { useState } from 'react'
import styles from '../styles/ProductPage.module.css'
import {Product} from '../interfaces'

interface Props  {
  products: Product[]
  updateCategory:Function
}

function categoryFilter({ products, updateCategory }:Props) {
  let categories: string[] | Set<string> = new Set(products.map(pro => pro.category))
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
