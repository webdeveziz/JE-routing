import React from 'react'
import PropTypes from 'prop-types'
import BookMark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import { Link } from 'react-router-dom'

const UsersTable = ({
  users,
  onSort,
  onToggleBookMark,
  onDelete,
  selectedSort
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          status={user.bookmark}
          id={user._id}
          onToggleBookMark={onToggleBookMark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Удалить
        </button>
      )
    }
  }

  return <Table {...{ selectedSort, onSort, columns, data: users }} />
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
}

export default UsersTable
