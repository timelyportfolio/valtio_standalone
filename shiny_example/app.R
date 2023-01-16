library(shiny)
# run with RStudio Run App button

# experiment with Shiny inputValues and valtio
#   reference:
#     https://github.com/pmndrs/valtio
ui <- tagList(
  tags$head(
    tags$script(src = "valtio.js"),
  ),
  tags$div(
    tags$h3("Increment with JavaScript"),
    tags$span("Shiny: "),
    textOutput("reporterR", inline = TRUE),
    
    tags$span("JavaScript: "),
    tags$span(
      id = "reporterJS"
    ),
    tags$span("valtio computed: "),
    tags$span(
      id = "reporterComputed"
    )
  ),
  tags$div(
    tags$h3("Increment with R/Shiny"),
    tags$span("Shiny (used numeric input for convenience): "),
    numericInput(inputId = 'x2', label = "", value = 0),
    tags$span("JavaScript: "),
    tags$span(
      id = "reporterJS2"
    )
  ),
  tags$script(HTML(
"
$(document).on('shiny:connected', function() {

  // once Shiny connected replace Shiny inputValues with reactive Shiny inputValues
  Shiny.shinyapp.$inputValues = valtio.proxy(Shiny.shinyapp.$inputValues)

  // do our counter using Shiny.setInputValue from JavaScript
  Shiny.setInputValue('x', 0) // initialize with 0
  
  // test valtio computed
  valtio.addComputed(Shiny.shinyapp.$inputValues, {
    doubled: snap => snap.x * 2,
  })
  
  valtio.subscribeKey(Shiny.shinyapp.$inputValues, 'x', (v) => {
    console.log('javascript', v)
    document.getElementById('reporterJS').innerText = v
  })
  
  valtio.subscribeKey(Shiny.shinyapp.$inputValues, 'doubled', (v) => {
    console.log('javascript', v)
    document.getElementById('reporterComputed').innerText = v
  })

  setInterval(
    function() {
      Shiny.setInputValue('x', Shiny.shinyapp.$inputValues.x + 1) //increment by 1
    },
    1000
  )

  // react to counter implemented in Shiny
  valtio.subscribeKey(Shiny.shinyapp.$inputValues, 'x2:shiny.number', (v) => {
    console.log('shiny', v)
    document.getElementById('reporterJS2').innerText = v
  })

})
"
  ))
)

server <- function(input, output, session) {
  x2 <- 100  # use this for state of Shiny counter
  output$reporterR <- renderText({input$x})

  observe({
    invalidateLater(1000, session = session)
    x2 <<- x2 - 1 # <<- or assign required to update parent
    updateNumericInput(inputId = "x2", value = x2, session = session)
  })
}

shinyApp(
  ui = ui,
  server = server,
  options = list(launch.browser = rstudioapi::viewer)
)
