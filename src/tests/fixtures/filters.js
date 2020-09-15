import moment from 'moment'
import { setEndDate } from '../../actions/filters'

const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
}

export { filters, altFilters}