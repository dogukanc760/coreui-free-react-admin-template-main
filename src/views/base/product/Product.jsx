import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CRow,
  CToast,
  CToastBody,
  CToastHeader,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import useFetch from '../../../hooks/useFetch'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = () => {
  const { data, loading, error, reFetch } = useFetch(`http://api-neta.herokuapp.com/api/product`)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [visible, setVisible] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [productName, setProductName] = useState('')
  const [productTitle, setProductTitle] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [brandName, setBrandName] = useState('Marka')
  const [categoryId, setCategoryId] = useState('')
  const [productPrice, setProductPrice] = useState('0')
  const [stockAmount, setStockAmount] = useState('0')
  const [productImage, setProductImage] = useState('')
  const [showHome, setShowHome] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState('')

  const [updateVisible, setUpdateVisible] = useState(false)

  const [updateProductName, setUpdateProductName] = useState('')
  const [updateProductTitle, setUpdateProductTitle] = useState('')
  const [updateProductDescription, setUpdateProductDescription] = useState('')
  const [updateBrandName, setUpdateBrandName] = useState('Marka')
  const [updateCategoryId, setUpdateCategoryId] = useState('')
  const [updateProductPrice, setUpdateProductPrice] = useState('0')
  const [updateStockAmount, setUpdateStockAmount] = useState('0')
  const [updateProductImage, setUpdateProductImage] = useState('')
  const [updateShowHome, setUpdateShowHome] = useState(false)
  const [updateIsActive, setUpdateIsActive] = useState(false)
  const [updateCategories, setUpdateCategories] = useState([])
  const [UpdatesubCategories, setUpdateSubCategories] = useState([])
  const [updateSubCategory, setUpdateSubCategory] = useState('')
  const [updateProductId, setUpdateProductId] = useState('')

  const handleUpdate = async (
    productId,
    productName,
    productTitle,
    productDescription,
    categoryId,
    productPrice,
    stockAmount,
    productImage,
  ) => {
    setUpdateVisible(true)
    setUpdateProductName(productName)
    setUpdateProductPrice(productPrice)
    setUpdateProductTitle(productTitle)
    setUpdateProductDescription(productDescription)
    setUpdateCategoryId(categoryId)
    setUpdateProductPrice(productPrice)
    setUpdateStockAmount(stockAmount)
    setUpdateProductImage(productImage)
    setUpdateProductId(productId)
  }

  const handleUpdateSubmit = async (e) => {
    const body = {
      brandId: '0',
      brandName: brandName,
      categoryId: updateCategoryId,
      price: updateProductPrice,
      productDescription: updateProductDescription,
      productImage: updateProductImage,
      productName: updateProductName,
      productTitle: updateProductTitle,
      stockAmount: updateStockAmount,
    }
    const res = await axios.put(
      `http://api-neta.herokuapp.com/api/product/${updateProductId}`,
      body,
    )
    if (res.status === 200) {
      setIsSubmit(true)
      setUpdateVisible(false)
      await reFetch()
      setTimeout(() => {
        setIsSubmit(false)
      }, 3000)
    } else {
      console.log(res)
    }
  }

  useEffect(async () => {
    await axios
      .get(`http://api-neta.herokuapp.com/api/category/`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err))
    console.log(categories)
  }, [])

  const getSubCategory = async (categoryId) => {
    await axios
      .get(`http://api-neta.herokuapp.com/api/category/sub/get-by-main/${categoryId}`)
      .then((res) => setSubCategories(res.data.data))
      .catch((err) => console.log(err))
    console.log(subCategories)
  }

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`http://api-neta.herokuapp.com/api/product/${id}`)
      if (res.status === 200) {
        reFetch()
        setVisible(false)
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: 'Marka Adı',
      selector: (row) => row.brandName,
      width: '200px',
    },
    {
      name: 'Fiyat',
      //cell: (row) => <img src={row.coverimage} width={50} alt={row.name}></img>,
      selector: (row) => row.price,
      width: '200px',
    },
    {
      name: 'Açıklama',
      selector: (row) => row.productDescription,
      width: '200px',
    },
    {
      name: 'Ürün Görseli',
      cell: (row) =>
        row.productImg.lenght > 1 ? (
          <img src={row.productImg} />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
            width="100"
            height="100"
          />
        ),
      selector: (row) => row.productImg,
      width: '200px',
    },
    {
      name: 'Ürün Adı',
      selector: (row) => row.productName,
      width: '200px',
    },
    {
      name: 'Ürün Başlığı',
      selector: (row) => row.productTitle,
      width: '200px',
    },
    {
      name: 'Mevcut Stok',
      selector: (row) => row.stockAmount,
      width: '200px',
    },
    {
      name: 'Anasayfada Gösteriliyor mu?',
      cell: (row) =>
        row.showHome ? (
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            checked
            onClick="return false"
            disabled="disabled"
          />
        ) : (
          <center>
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              onClick="return false"
              disabled="disabled"
            />
          </center>
        ),
      selector: (row) => row.showHome,
      width: '200px',
    },
    {
      name: 'Bu Ürün Aktif mi?',
      cell: (row) =>
        row.isActive ? (
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            checked
            onClick="return false"
            disabled="disabled"
          />
        ) : (
          <center>
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              onClick="return false"
              disabled="disabled"
            />
          </center>
        ),
      selector: (row) => row.isActive,
      width: '200px',
    },
    {
      name: 'Sil',
      cell: (row) => (
        <CButton color="danger" size="sm" onClick={() => deleteData(row._id)}>
          <i style={{ color: 'white' }}>Sil</i>
        </CButton>
      ),
      selector: (row) => row.isActive,
      width: '100px',
    },
    {
      name: 'Düzenle',
      cell: (row) => (
        <CButton
          color="info"
          size="sm"
          onClick={() =>
            handleUpdate(
              row._id,
              row.productName,
              row.productTitle,
              row.productDescription,
              row.categoryId,
              row.price,
              row.stockAmount,
              row.productImage,
            )
          }
        >
          <i style={{ color: 'white' }}>Düzenle</i>
        </CButton>
      ),
      selector: (row) => row.isActive,
      width: '100px',
    },
  ]

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const body = {
        brandId: '0',
        brandName: brandName,
        categoryId: categoryId,
        price: productPrice,
        productDescription: productDescription,
        productImage: productImage,
        productName: productName,
        productTitle: productTitle,
        stockAmount: stockAmount,
      }
      const res = await axios.post(`http://api-neta.herokuapp.com/api/product/`, body)
      if (res.status === 201) {
        setIsSubmit(true)
        setVisible(false)
        await reFetch()
        setTimeout(() => {
          setIsSubmit(false)
        }, 3000)
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ürün Yönetim</strong> <span style={{ width: 20 }}></span>
            <CButton color="info" size="sm" onClick={() => setVisible(!visible)}>
              <i style={{ color: 'white' }}>Yeni Oluştur</i>
            </CButton>
            <CModal
              visible={visible}
              onClose={() => {
                setVisible(false)
                setIsActive(false)
                setShowHome(false)
              }}
            >
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle>Yeni Ürün Oluşturma</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Aşağıda ki bilgileri doldurarak yeni bir ürün oluşturabilirsiniz. <br />
                <br />
                <CInputGroup className="mb-3">
                  <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                    Ürün Kategorisi
                  </CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect01"
                    onChange={(e) => {
                      getSubCategory(e.target.value)
                      setCategoryId(e.target.value)
                    }}
                  >
                    <option>Lütfen Seçiniz</option>
                    {categories.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.categoryName}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup className="mb-3">
                  <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                    Ürün Alt Kategorisi
                  </CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect01"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option>Lütfen Seçiniz</option>
                    {subCategories.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.subCategoryName}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                <br />
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <CFormInput
                    type="number"
                    id="floatingInputValue"
                    floatingLabel="Ürün Fiyatı"
                    placeholder=" Fiyat"
                    onChange={(e) => setProductPrice(e.target.value)}
                  />{' '}
                  <br />
                  <CFormInput
                    type="text"
                    id="floatingInputValue"
                    floatingLabel="Ürün Açıklaması"
                    placeholder="Ürün Açıklaması"
                    onChange={(e) => setProductDescription(e.target.value)}
                  />{' '}
                  <br />
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="file"
                      id="inputGroupFile02"
                      onChange={(e) => setProductImage(e.target.value)}
                    />
                    <CInputGroupText component="label" htmlFor="inputGroupFile02">
                      Yükle
                    </CInputGroupText>
                  </CInputGroup>
                  <br />
                  <CFormInput
                    type="text"
                    id="floatingInputValue"
                    floatingLabel="Ürün Adı"
                    placeholder="Ürün Adı"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <br />
                  <CFormInput
                    type="text"
                    id="floatingInputValue"
                    floatingLabel="Ürün Başlığı"
                    placeholder="Ürün Başlığı"
                    onChange={(e) => setProductTitle(e.target.value)}
                  />
                  <br />
                  <CFormInput
                    type="number"
                    id="floatingInputValue"
                    floatingLabel="Mevcut Stok"
                    placeholder="Mevcut Stok"
                    onChange={(e) => setStockAmount(e.target.value)}
                  />
                  <br />
                  <center>
                    <CButton type="submit" color="primary" size="sm">
                      Değişiklikleri kaydet.
                    </CButton>
                  </center>
                </Form>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Kapat
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardHeader>

          <CCardBody>
            <p className="text-medium-emphasis small">
              Ürünlerinizi bu sayfadan yönetebilir ve düzenleyebilirsiniz.
            </p>
          </CCardBody>
        </CCard>

        <CModal
          visible={updateVisible}
          onClose={() => {
            setVisible(false)
            setIsActive(false)
            setShowHome(false)
          }}
        >
          <CModalHeader onClose={() => setUpdateVisible(false)}>
            <CModalTitle> {updateProductName} adlı ürünü güncelliyorsunuz.</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {updateProductName} adlı ürünü güncelliyorsunuz. <br />
            <br />
            <CInputGroup className="mb-3">
              <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                Ürün Kategorisi
              </CInputGroupText>
              <CFormSelect
                id="inputGroupSelect01"
                onChange={(e) => {
                  getSubCategory(e.target.value)
                  setUpdateCategoryId(e.target.value)
                }}
              >
                <option>Lütfen Seçiniz</option>
                {categories.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.categoryName}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
            <br />
            <CInputGroup className="mb-3">
              <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                Ürün Alt Kategorisi
              </CInputGroupText>
              <CFormSelect
                id="inputGroupSelect01"
                onChange={(e) => setUpdateSubCategory(e.target.value)}
              >
                <option>Lütfen Seçiniz</option>
                {subCategories.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.subCategoryName}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
            <br />
            <Form onSubmit={(e) => handleUpdateSubmit(e)}>
              <CFormInput
                type="number"
                id="floatingInputValue"
                floatingLabel="Ürün Fiyatı"
                placeholder=" Fiyat"
                value={updateProductPrice}
                onChange={(e) => setUpdateProductPrice(e.target.value)}
              />{' '}
              <br />
              <CFormInput
                type="text"
                id="floatingInputValue"
                floatingLabel="Ürün Açıklaması"
                placeholder="Ürün Açıklaması"
                value={updateProductDescription}
                onChange={(e) => setUpdateProductDescription(e.target.value)}
              />{' '}
              <br />
              <CInputGroup className="mb-3">
                <CFormInput
                  type="file"
                  id="inputGroupFile02"
                  value={updateProductImage}
                  onChange={(e) => setUpdateProductImage(e.target.value)}
                />
                <CInputGroupText component="label" htmlFor="inputGroupFile02">
                  Yükle
                </CInputGroupText>
              </CInputGroup>
              <br />
              <CFormInput
                type="text"
                id="floatingInputValue"
                floatingLabel="Ürün Adı"
                placeholder="Ürün Adı"
                value={updateProductName}
                onChange={(e) => setUpdateProductName(e.target.value)}
              />
              <br />
              <CFormInput
                type="text"
                id="floatingInputValue"
                floatingLabel="Ürün Başlığı"
                placeholder="Ürün Başlığı"
                value={updateProductTitle}
                onChange={(e) => setUpdateProductTitle(e.target.value)}
              />
              <br />
              <CFormInput
                type="number"
                id="floatingInputValue"
                floatingLabel="Mevcut Stok"
                placeholder="Mevcut Stok"
                value={updateStockAmount}
                onChange={(e) => setUpdateStockAmount(e.target.value)}
              />
              <br />
              <center>
                <CButton type="submit" color="primary" size="sm">
                  Değişiklikleri kaydet.
                </CButton>
              </center>
            </Form>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setUpdateVisible(false)}>
              Kapat
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
      {isSubmit ? (
        <center>
          <CToast autohide={true} visible={true}>
            <CToastHeader closeButton>
              <svg
                className="rounded me-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
              >
                <rect width="100%" height="100%" fill="#007aff"></rect>
              </svg>
              <strong className="me-auto">Bilgilendirme</strong>
              <small>Şimdi</small>
            </CToastHeader>
            <CToastBody>Ekleme İşlemi Başarılı.</CToastBody>
          </CToast>
          <br />
        </center>
      ) : null}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ürün Yönetim</strong>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Product
