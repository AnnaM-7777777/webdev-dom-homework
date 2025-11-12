export let comments = []

export const updateComments = (newComments) => {
    comments.length = 0
    comments.push(...newComments)
}
