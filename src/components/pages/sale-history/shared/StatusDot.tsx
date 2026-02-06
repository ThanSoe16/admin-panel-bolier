import React from 'react'

type Status = 'success' | 'pending' | 'error' | 'Verified' | 'Pending' | 'Suspended' | 'Successful' | 'In Progress' | 'Failed' | 'Active' | 'Expired' | 'Pending' | undefined

interface StatusDotProps {
  status: Status
}

const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'success':
      case 'Verified':
      case 'Successful':
        return 'bg-success'
      case 'pending':
      case 'In Progress':
      case 'Pending':
        return 'bg-warning'
      case 'error':
      case 'Failed':
      case 'Suspended':
        return 'bg-error'
      default:
        return 'bg-success'
    }
  }

  return (
      <span className={`h-2 w-2 rounded-full ${getStatusColor(status)} mr-2`} />
  )
}

export default StatusDot
