import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res
        .status(401)
        .json({ error: 'Você não é um prestador de serviços' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
