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
  CFormSwitch,
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

const Category = () => {
  const { data, loading, error, reFetch } = useFetch(`http://api-neta.herokuapp.com/api/category`)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [visible, setVisible] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [showHome, setShowHome] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    console.log(data)
    console.log(data.length)
    setTotalRows(data.length)
  })

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`http://api-neta.herokuapp.com/api/category/${id}`)
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
      name: 'Kategori Adı',
      selector: (row) => row.categoryName,
      width: '200px',
    },
    {
      name: 'Kategori Başlığı',
      //cell: (row) => <img src={row.coverimage} width={50} alt={row.name}></img>,
      selector: (row) => row.categoryTitle,
      width: '200px',
    },
    {
      name: 'Açıklama',
      selector: (row) => row.categoryDescription,
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
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            onClick="return false"
            disabled="disabled"
          />
        ),
      selector: (row) => row.showHome,
      width: '200px',
    },
    {
      name: 'Bu Kategori Aktif mi?',
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
        <CButton color="info" size="sm">
          <Link to={'/base/categoryDetail/id=' + row._id}>
            {' '}
            <i style={{ color: 'white' }}>Düzenle</i>
          </Link>
        </CButton>
      ),
      selector: (row) => row.isActive,
      width: '100px',
    },
  ]

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const body = { categoryName, categoryTitle, categoryDescription, showHome, isActive }
      const res = await axios.post(`http://api-neta.herokuapp.com/api/category/`, body)
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
            <strong>Kategori Yönetim</strong> <span style={{ width: 20 }}></span>
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
                <CModalTitle>Yeni Kategori Oluşturma</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Aşağıda ki bilgileri doldurarak yeni bir kategori oluşturabilirsiniz. <br />
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <CFormInput
                    type="text"
                    id="floatingInputValue"
                    floatingLabel="Kategori Adı"
                    placeholder="Kategori Adı"
                    onChange={(e) => setCategoryName(e.target.value)}
                  />{' '}
                  <br />
                  <CFormInput
                    type="text"
                    id="floatingInputValue"
                    floatingLabel="Kategori Başlığı"
                    placeholder="Kategori Başlığı"
                    onChange={(e) => setCategoryTitle(e.target.value)}
                  />{' '}
                  <br />
                  <CFormInput
                    type="text"
                    id="floatingInputValue"
                    floatingLabel="Kategori Açıklaması"
                    placeholder="Kategori Açıklaması"
                    onChange={(e) => setCategoryDescription(e.target.value)}
                  />
                  <br />
                  <CFormSwitch
                    label="Anasayfada gösterilsin mi?"
                    id="formSwitchCheckDefault"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setShowHome(true)
                      } else {
                        setShowHome(false)
                      }
                    }}
                  />
                  <CFormSwitch
                    label="Default olarak aktif olsun mu ?"
                    id="formSwitchCheckDefault"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIsActive(true)
                      } else {
                        setIsActive(false)
                      }
                    }}
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
              Ana Kategorilerinizi ve alt kategorilerinizi bu sayfadan yönetebilir ve
              düzenleyebilirsiniz.
            </p>
          </CCardBody>
        </CCard>
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
            <strong>Ana Kategori Yönetim</strong>
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

export default Category
