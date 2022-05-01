import React, { useState, useEffect } from 'react'
import { paginate } from '../../utils/paginate'
import Pagination from '../pagination'
import PropTypes from 'prop-types'
import GroupList from '../groupList'
import api from '../../api'
import SearchStatus from '../searchStatus'
import UsersTable from '../usersTable'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import UserInfo from '../userInfo'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const pageSize = 8

  const params = useParams()
  const { postId } = params

  // old App.js start
  const [users, setUsers] = useState()

  useEffect(async () => {
    const response = await api.users.fetchAll()
    setUsers(response)
  }, [])

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    const arrayOfUsers = users.filter((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark
        return user
      }
      return user
    })

    setUsers(arrayOfUsers)
  }
  // old App.js end

  useEffect(async () => {
    const response = await api.professions.fetchAll()
    setProfessions(response)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  // Sort
  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    let filteredUsers = ''
    if (selectedProf) {
      filteredUsers = users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    } else {
      filteredUsers = users
    }

    const count = filteredUsers.length
    const sorteredUsers = _.orderBy(
      filteredUsers,
      [sortBy.path],
      [sortBy.order]
    )
    const cropUser = paginate(sorteredUsers, currentPage, pageSize)

    return (
      <>
        {postId ? (
          <div>{<UserInfo id={postId} />}</div>
        ) : (
          <div className="d-flex mt-2">
            {professions && (
              <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                  selectedItem={selectedProf}
                  items={professions}
                  onSelectItem={handleProfessionSelect}
                />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={clearFilter}
                >
                  Сброс
                </button>
              </div>
            )}
            <div className="d-flex flex-column">
              <SearchStatus length={count} />
              {count > 0 && (
                <UsersTable
                  users={cropUser}
                  onToggleBookMark={handleToggleBookMark}
                  onDelete={handleDelete}
                  selectedSort={sortBy}
                  onSort={handleSort}
                />
              )}
              <div className="d-flex justify-content-center">
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
  return <h2>Загружаем...</h2>
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object)
}

export default Users
