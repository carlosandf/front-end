import React from 'react'
import { useAppSelector } from '../hooks/redux';

const EditInfo = () => {
  const { clientsState: { client } } = useAppSelector((state) => state);
  console.log(client)
  return (
    <div>EditInfo</div>
  )
}

export default EditInfo;