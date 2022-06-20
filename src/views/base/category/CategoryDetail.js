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
import { useParams, useSearchParams } from 'react-router-dom'

const CategoryDetail = () => {
  //when page loaded
  let { id } = useParams()
  //get main data when component did mount
  const [mainCategory, setMainCategory] = useState([])
  const [mainName, setMainName] = useState('')
  const [mainTitle, setMainTitle] = useState('')
  const [mainDescription, setMainDescription] = useState('')
  const [mainHome, setMainHome] = useState(false)
  const [mainActive, setMainActive] = useState(false)

  useEffect(async () => {
    const res = await axios.get(
      `http://api-neta.herokuapp.com/api/category/${id.replace('id=', '')}`,
    )
    setMainCategory(res.data.data)
  }, [])

  const handleMainUpdate = async (e) => {
    try {
      e.preventDefault()
      const body = {
        categoryName: mainName,
        categoryTitle: mainTitle,
        categoryDescription: mainCategory,
        showHome: mainHome,
        isActive: mainActive,
      }
      const res = await axios.put(
        `http://api-neta.herokuapp.com/api/category/` + id.replace('id=', ''),
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
        console.log(res.data)
      }
    } catch (err) {
      console.log(error)
    }
  }
  const { data, loading, error, reFetch } = useFetch(
    `http://api-neta.herokuapp.com/api/category/sub/get-by-main/${id.replace('id=', '')}`,
  )
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchParams, setSearchParams] = useState('')
  const [visible, setVisible] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [showHome, setShowHome] = useState(false)
  const [isActive, setIsActive] = useState(false)

  //update item
  //show update modal
  const [updateVisible, setUpdateVisible] = useState(false)
  const [idState, setIdState] = useState('')
  const [nameState, setNameState] = useState('')
  const [titleState, setTitleState] = useState('')
  const [descriptionState, setDescriptionState] = useState('')
  const [showState, setShowState] = useState(false)
  const [isAct, setIsAct] = useState(false)
  const handleClickUpdate = (rowId, name, title, description, showHo, isAct) => {
    setIdState(rowId)
    setNameState(name)
    setTitleState(title)
    setDescriptionState(description)
    setShowHome(showHo)
    setIsAct(isAct)
    setUpdateVisible(true)
  }
  useEffect(() => {
    reFetch()
  }, [data])

  const deleteData = async (subId) => {
    try {
      setIsSubmit(true)
      const res = await axios.delete(
        `http://api-neta.herokuapp.com/api/category/sub/delete-sub/${subId}`,
      )
      if (res.status === 200) {
        await reFetch()
        setTimeout(() => {
          setIsSubmit(false)
        }, 3000)
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
      name: 'Alt Kategori Adı',
      selector: (row) => row.subCategoryName,
      width: '200px',
    },
    {
      name: 'Alt Kategori Başlığı',
      //cell: (row) => <img src={row.coverimage} width={50} alt={row.name}></img>,
      selector: (row) => row.subCategoryTitle,
      width: '200px',
    },
    {
      name: 'Açıklama',
      selector: (row) => row.subCategoryDescription,
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
        <CButton
          color="info"
          size="sm"
          onClick={() =>
            handleClickUpdate(
              row._id,
              row.subCategoryName,
              row.subCategoryTitle,
              row.subCategoryDescription,
              row.showHome,
              row.isActive,
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
        subCategoryName: categoryName,
        subCategoryTitle: categoryTitle,
        subCategoryDescription: categoryDescription,
        showHome,
        isActive,
      }
      const res = await axios.post(
        `http://api-neta.herokuapp.com/api/category/sub/add-sub/${id.replace('id=', '')}`,
        body,
      )
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
  const handleUpdateSubmit = async (e) => {
    try {
      e.preventDefault()
      const body = {
        subCategoryName: nameState,
        subCategoryTitle: titleState,
        subCategoryDescription: descriptionState,
        showHome: showState,
        isActive: isAct,
      }
      const res = await axios.put(
        `http://api-neta.herokuapp.com/api/category/sub/update-sub/` + idState,
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
        console.log(res.data)
      }
    } catch (err) {
      console.log(error)
    }
  }

  return (
    <CRow>
      <CModal
        visible={updateVisible}
        onClose={() => {
          setUpdateVisible(false)
          setIsAct(false)
          setShowState(false)
        }}
      >
        <CModalHeader onClose={() => setUpdateVisible(false)}>
          <CModalTitle>{nameState} Adlı Kategoriyi Güncelliyorsunuz</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Aşağıda ki bilgileri doldurarak güncelleyebilirsiniz. <br />
          <Form onSubmit={(e) => handleUpdateSubmit(e)}>
            <CFormInput
              type="text"
              id="floatingInputValue"
              floatingLabel="Kategori Adı"
              placeholder="Kategori Adı"
              value={nameState}
              onChange={(e) => setNameState(e.target.value)}
            />{' '}
            <br />
            <CFormInput
              type="text"
              id="floatingInputValue"
              floatingLabel="Kategori Başlığı"
              placeholder="Kategori Başlığı"
              value={titleState}
              onChange={(e) => setTitleState(e.target.value)}
            />{' '}
            <br />
            <CFormInput
              type="text"
              id="floatingInputValue"
              floatingLabel="Kategori Açıklaması"
              placeholder="Kategori Açıklaması"
              value={descriptionState}
              onChange={(e) => setDescriptionState(e.target.value)}
            />
            <br />
            <CFormSwitch
              label="Anasayfada gösterilsin mi?"
              id="formSwitchCheckDefault"
              defaultChecked={showState}
              onChange={(e) => {
                if (e.target.checked) {
                  setShowState(true)
                } else {
                  setShowState(false)
                }
              }}
            />
            <CFormSwitch
              label="Default olarak aktif olsun mu ?"
              id="formSwitchCheckDefault"
              defaultChecked={isAct}
              onChange={(e) => {
                if (e.target.checked) {
                  setIsAct(true)
                } else {
                  setIsAct(false)
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
          <CButton color="secondary" onClick={() => setUpdateVisible(false)}>
            Kapat
          </CButton>
        </CModalFooter>
      </CModal>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{mainCategory.categoryName} Adlı Kategori Yönetimi</strong>{' '}
            <span style={{ width: 20 }}></span> <br /> <br />
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
              Alt Kategorilerinizi bu sayfadan yönetebilir ve düzenleyebilirsiniz.
            </p>
            <Form onSubmit={(e) => handleMainUpdate(e)}>
              <CFormInput
                type="text"
                id="floatingInputValue"
                floatingLabel="Kategori Adı"
                placeholder="Kategori Adı"
                value={mainCategory.categoryName}
                onChange={(e) => setMainName(e.target.value)}
              />{' '}
              <br />
              <CFormInput
                type="text"
                id="floatingInputValue"
                floatingLabel="Kategori Başlığı"
                placeholder="Kategori Başlığı"
                value={mainCategory.categoryTitle}
                onChange={(e) => setMainTitle(e.target.value)}
              />{' '}
              <br />
              <CFormInput
                type="text"
                id="floatingInputValue"
                floatingLabel="Kategori Açıklaması"
                placeholder="Kategori Açıklaması"
                value={mainCategory.categoryDescription}
                onChange={(e) => setMainDescription(e.target.value)}
              />
              <br />
              <CFormSwitch
                label="Anasayfada gösterilsin mi?"
                id="formSwitchCheckDefault"
                defaultChecked={mainHome}
                onChange={(e) => {
                  if (e.target.checked) {
                    setMainHome(true)
                  } else {
                    setMainHome(false)
                  }
                }}
              />
              <CFormSwitch
                label="Default olarak aktif olsun mu ?"
                id="formSwitchCheckDefault"
                defaultChecked={mainActive}
                onChange={(e) => {
                  if (e.target.checked) {
                    setMainActive(true)
                  } else {
                    setMainActive(false)
                  }
                }}
              />
              <br />
              <CButton type="submit" color="primary" size="sm">
                Değişiklikleri kaydet.
              </CButton>{' '}
              <br /> <br />
            </Form>
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
            <CToastBody>İşlem Başarılı.</CToastBody>
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

export default CategoryDetail
