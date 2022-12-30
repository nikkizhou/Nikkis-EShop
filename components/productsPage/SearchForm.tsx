import React from 'react'
import styles from '../../styles/ProductPage.module.css'

const SearchForm = ({ handleSubmit, showAllPro }) =>
  <div className={styles.formWrapper}>
    <form onSubmit={handleSubmit}>
      <input placeholder='Search Product...' name='input'></input>
      <button className='buttonS'>Search</button>
    </form>
    <button onClick={() => showAllPro()} className='buttonS'>Show All</button>
  </div>

export default SearchForm
