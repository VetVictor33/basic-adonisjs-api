import { v4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '3mb',
  }
  public async index() {
    const moments = await Moment.query().preload('comments')

    return {
      data: moments,
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const imageFile = request.file('image', this.validationOptions)
    if (imageFile) {
      const imageName = `${v4()}.${imageFile.extname}`

      await imageFile.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      body.image = imageName
    }
    const { title, description, image } = request.body()
    const momentToStore = { title, description, image }
    const moment = await Moment.create(momentToStore)
    response.status(201)
    return {
      message: 'Moment seccessfully created',
      data: moment,
    }
  }

  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)
    await moment.load('comments')

    return {
      data: moment,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)
    await moment.delete()
    return {
      messege: 'Moment removed',
    }
  }
}
