import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {
  public async store({ request, params, response }: HttpContextContract) {
    const momentId = params.momentId
    await Moment.findOrFail(momentId)

    const { username, text } = request.body()
    const commentToStore = { username, text, momentId }
    const comment = await Comment.create(commentToStore)

    response.status(201)

    return {
      message: 'Comment successfully created',
      data: comment,
    }
  }
}
