import React from 'react'
import './pop.scss'

const Popup = () => {
  return (
    <div class="container">
      <h1>
        Making the <code>&lt;details&gt;</code> element look and behave like a modal<sup>(kinda..)</sup>
      </h1>

      <p>By nesting a modal inside a details element it is automaticly shown when the details is opened. And by nesting the overlay inside the summary element, we can use that to trigger a close.</p>

      <details>
        <summary>
          <div class="button">
            Show me the modal
          </div>
          <div class="details-modal-overlay"></div>
        </summary>
        <div class="details-modal">
          <div class="details-modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
            </svg>
          </div>
          <div class="details-modal-title">
            <h1>My details modal</h1>
          </div>
          <div class="details-modal-content">
            <p>
              You can click the X in the corner or click the overlay to close this modal.
              Something like this could be useful as a nice way to show additional information,
              but that's about as far as I would take it. It's just a nice way of styling the details element.
            </p>
          </div>
        </div>
      </details>
    </div>
  )
}

export default Popup