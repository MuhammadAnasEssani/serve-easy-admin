import React, {useState, useEffect} from 'react'
import {Switch} from 'antd'
import DashboardOffCanvas from '../dashboard/DashboardOffCanvas'
import CustomerBlacklistForm from './CustomerBlacklistForm'
import {CustomerServices} from '../../services/api-services/customer-listing-service'
import {ICustomerBlacklistCreate, ICustomerListing} from '../../interfaces/ICustomerManagement'
import {toast} from 'react-toastify'

const BlacklistButton = ({customer}: {customer: ICustomerListing}) => {
  const [isOpenReason, setIsOpenReason] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!!customer.customer_blacklist) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [customer.customer_blacklist])

  const handleChange = async (event: boolean) => {
    // if switch will move to turn on it will just open give reason modal
    if (event) {
      setIsOpenReason(true)
    } else {
      // in turn off case first it will off switch locally then call api to server
      setStatus(false)
      setLoading(true)
      let response = await CustomerServices.customerBlacklistRemove(customer.id)
      setLoading(false)
      if (response.status) {
        toast.success(response.message)
      } else {
        // if api fail for any reason it will revert switch status to open
        setStatus(true)
      }
    }
  }
  const handleSubmit = async (data: ICustomerBlacklistCreate) => {
    let payload: ICustomerBlacklistCreate = {
      ...data,
      customer_id: customer.id,
    }
    setLoading(true)
    let response = await CustomerServices.customerBlacklist(payload)
    setLoading(false)
    if (response.status) {
      setIsOpenReason(false)
      setStatus(true)
    }
  }

  return (
    <>
      <Switch checked={status} disabled={loading} onChange={handleChange} />
      <DashboardOffCanvas
        state={isOpenReason}
        setActive={setIsOpenReason}
        children={
          <CustomerBlacklistForm
            loading={loading}
            onSubmit={handleSubmit}
            name={customer.full_name}
          />
        }
        heading={'Reason for blacklist'}
      />
    </>
  )
}
export default BlacklistButton
