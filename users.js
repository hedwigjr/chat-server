let users = []

function preparedText (text) {
text.trim().toLowerCase()
}

const addUser = (user) => {
    const userName = preparedText(user.name)
    const userRoom = preparedText(user.room)


    const isExist = users.find(
        (u)=>
        preparedText(u.name) === userName &&
        preparedText(u.room) === userRoom
        )

    !isExist && users.push(user)

    const currentUser = isExist || user
    return { isExist: isExist, user: currentUser}
}

module.exports = {addUser}