import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'

export default class MomentsController {
  public async store({ request, response }: HttpContextContract) {
    const { title, description, image } = request.body()
    const momentToSave = { title, description, image }
    const moment = await Moment.create(momentToSave)
    response.status(201)
    return {
      moment,
    }
  }
}
