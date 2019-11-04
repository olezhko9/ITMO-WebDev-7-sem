import '../style/main.sass'
import {onFormSubmit, onCloseButtonClick} from "./handlers";


$('#city-form').submit(onFormSubmit)

$(document).on('click', '.close', onCloseButtonClick)
