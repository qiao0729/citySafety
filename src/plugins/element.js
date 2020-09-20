import Vue from 'vue'
import { 
    Button,
    Row,
    Col,
    Table,
    TableColumn,
    Select,
    Option,
    DatePicker,
    Carousel,
    CarouselItem,
    Form,
    FormItem,
    Input,
    Message,
    Notification


} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

