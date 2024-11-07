import React, {useEffect, useState} from 'react'
import PosDeviceCard from '../../../components/dashboard/PosDeviceCard'
import '../../../../assets/css/views/dashboard/pos-device.scss'
import {useUserContext} from '../../../providers/UserProvider'
import DashboardOffCanvas from '../../../components/dashboard/DashboardOffCanvas'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {TablePaginationConfig} from 'antd/lib/table'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import CreatePosDevice from './CreatePosDevice'
import {Col, Row} from 'react-bootstrap'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'
import ViewCard from '../../../components/dashboard/ViewCard'
import {PosDeviceServices} from '../../../services/api-services/posDevice.services'
import {IDeviceList} from '../../../interfaces/IPosDevice'
import EditPosDevice from './EditPosDevice'
import ThemeModal from '../../../components/Modal'
import PosDeviceDelete from '../../../components/dashboard/PosDeviceDelete'
import PosListingSkeleton from '../../../skeletons/pos-devices/PosListingSkeleton'
import NoDataImage from '../../../../assets/images/pos-devices/no-data-found.svg'

export default function PosDeviceListing() {
  const {setTitle, establishmentId} = useUserContext()
  const [createDevice, setCreateDevice] = useState(false)
  const [editDevice, setEditDevice] = useState(false)
  const [deleteDevice, setDeleteDevice] = useState(false)
  const [editDeviceId, setEditDeviceId] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [devices, setDevices] = useState<IDeviceList[]>([])
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })
  useEffect(() => {
    setTitle('POS Devices')
  }, [])
  useEffect(() => {
    establishmentId && fetchInitialData()
  }, [establishmentId])

  /**
   * Fetch the initial data
   * Separatly created this function because of the loader
   * The fetch data is being called after update and delete event, so we didn't need to load the shimmer again and again
   */
  const fetchInitialData = async () => {
    setLoading(true)
    await fetchData()
    setLoading(false)
  }
  const fetchData = async (params: IDatatableParams = {}) => {
    // setLoading(true);
    const res = await PosDeviceServices.index(
      {establishment_id: establishmentId},
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setDevices(res.data.data)
    }
    // setLoading(false);
  }
  const handleEditDevice = (id: number) => {
    setEditDevice(true)
    setDeleteDevice(false)
    setEditDeviceId(id)
  }
  const handleDeleteDevice = (id: number) => {
    setEditDevice(false)
    setDeleteDevice(true)
    setEditDeviceId(id)
  }
  if (loading) {
    return <PosListingSkeleton />
  }

  return (
    <ViewCard>
      <>
        <div>
          <Row>
            <Col md={12} className={'d-flex align-items-center mb-3'}>
              <ThemeButton
                className={'create-listing-btn'}
                onClick={() => setCreateDevice(true)}
                text={'Create Device'}
                prefixIcon={<MdAdd />}
                id={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
              />
            </Col>
          </Row>

          <Row>
            {devices.length > 0 ? (
              devices.map((device, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={4} xxl={3}>
                  <PosDeviceCard
                    device={device}
                    isActive={true}
                    handleEdit={handleEditDevice}
                    handleDelete={handleDeleteDevice}
                  />
                </Col>
              ))
            ) : (
              <div className={'pos-empty-icon'}>
                <img src={NoDataImage} />
              </div>
            )}
          </Row>
          <DashboardOffCanvas
            state={createDevice}
            setActive={setCreateDevice}
            children={
              <CreatePosDevice
                setActive={setCreateDevice}
                reloadTable={() => fetchData({pagination})}
              />
            }
            heading={'Create Device'}
            reloadTable={() => fetchData({pagination})}
          />
          <DashboardOffCanvas
            state={editDevice}
            setActive={setEditDevice}
            children={
              <EditPosDevice
                id={editDeviceId}
                reloadTable={() => fetchData({pagination})}
                handleClose={() => setEditDevice(false)}
              />
            }
            heading={'Edit Device'}
            reloadTable={() => fetchData({pagination})}
          />
          <ThemeModal
            title={null}
            hideFooter={true}
            active={deleteDevice}
            setActive={setDeleteDevice}
            children={
              <PosDeviceDelete
                handleCancel={() => setDeleteDevice(false)}
                reloadTable={() => fetchData({pagination})}
                id={editDeviceId}
              />
            }
          />
        </div>
      </>
    </ViewCard>
  )
}
