import React, { useState/* , ReactNode  */} from 'react';
import { TimeSplit } from '../typings/global'
import { tick } from '../utils/time'
import { useCssHandles } from "vtex.css-handles"
import "./styles.css"

type Props = {
  targetDate: string
  contentBanner: string,
  text: string,
  image: string
}


const CountdownPromotion = ({ targetDate, contentBanner, text, image }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeSplit>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const CSS_HANDLES = [
    "container",
    "banner",
    "countdown",
    "bannerText"
  ]
  const handles = useCssHandles(CSS_HANDLES)

  tick(targetDate, setTimeRemaining)

  console.log(targetDate)

  return (
    <div className={handles["container"]}>
      <div className={handles["banner"]}>
      {contentBanner === "image"
      ? <img width="1080" height="150" src={image} />
      : contentBanner === "text"
      ? <div><h1>{text}</h1></div>
      : <div><h1>1080 x 150</h1></div>
      }
      </div>

      <div className={handles["countdown"]}>
        <h1>{`
        ${timeRemaining.days}:${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
        </h1>
        <div>
          <p>D</p>
          <p>H</p>
          <p>M</p>
          <p>S</p>
        </div>
      </div>
    </div>
  )
}

CountdownPromotion.schema = {
  title: 'Countdown',
  description: 'Countdown Promotion',
  type: 'object',
  properties: {
    targetDate: {
      title: 'Final date',
      description: 'Choose the final date',
      type: 'string',
      widget: {
        'ui:widget': 'date',
      },
      default: null
    },
    contentBanner: {
        "title": 'Content Banner',
        "enum": [
          "empty",
          "image",
          "text"
        ],
        "default": "empty"
      }
    },
    "dependencies": {
      contentBanner: {
        "oneOf": [
          {
            "properties": {
              contentBanner: {
                "enum": [
                  "empty"
                ]
              }
            }
          },
          {
            "properties": {
              contentBanner: {
                "enum": [
                  "image"
                ]
              },
              "image": {
                widget: {
                  'ui:widget': 'image-uploader',
                },
                "type": "string"
              },

            },
          },
          {
            "properties": {
              contentBanner: {
                "enum": [
                  "text"
                ]
              },
              "text": {
                "type": "string"
              }
            },
          }
        ]
      }

  }
}

export default CountdownPromotion
