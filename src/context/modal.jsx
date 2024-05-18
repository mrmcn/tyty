import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)
export default function useModalContext() {
  return useContext(ModalContext)
}
export function ModalContextProvider({ children }) {
  const [openCategoriesMenu, setOpenCategoriesMenu] = useState(false)
  const [openNavBar, setOpenNavBar] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [isClosingFilters, setIsClosingFilters] = useState(false)
  const value = {
    openCategoriesMenu,
    setOpenCategoriesMenu,
    openNavBar,
    setOpenNavBar,
    openCart,
    setOpenCart,
    filtersOpen,
    setFiltersOpen,
    isClosingFilters,
    setIsClosingFilters,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
