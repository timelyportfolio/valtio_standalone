library(shiny)

# experiment with Shiny inputValues and valtio
#   reference:
#     https://github.com/pmndrs/valtio
ui <- tagList(
  tags$head(
    tags$script(src = "valtio.js"),
  ),
  tags$script(HTML(
"
$(document).on('shiny:connected', function() {

  // once Shiny connected replace Shiny inputValues with reactive Shiny inputValues
  Shiny.shinyapp.$inputValues = valtio.proxy(Shiny.shinyapp.$inputValues)

  const stop = valtio.watch((get) => {
    console.log('state has changed to', get(Shiny.shinyapp.$inputValues)) // auto-subscribe on use
  })

})
"
  ))
)

server <- function(input, output, session) {}

shinyApp(
  ui = ui,
  server = server,
  options = list(launch.browser = rstudioapi::viewer)
)
