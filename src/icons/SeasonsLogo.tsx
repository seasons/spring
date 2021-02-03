import React from "react"

interface SeasonsLogoProps {
  size?: string
  color?: string
}

export const SeasonsLogo: React.FC<SeasonsLogoProps> = ({ size = "100", color = "#FFF" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 1200 1200">
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill={color} fillRule="nonzero" transform="translate(0 8.663)">
          <path d="M633.978 58.828c-10.4-21.827-25.577-32.477-45.837-31.95-24.369.643-39.546 13.681-38.97 35.11.28 10.732 4.6 18.515 12.641 23.044 8.358 4.518 21.457 8.907 39.628 13.155 16.257 3.687 24.862 5.98 36.752 11.984 17.607 8.38 26.2 20.786 27.773 43.795 1.173 46.72-26.998 71.145-71.603 72.327-42.739 1.17-74.678-21.066-84.362-63.468l25.683-10.79c9.39 32.605 28.852 48.51 57.963 47.738 27.866-.726 45.227-15.086 44.523-41.278a28.41 28.41 0 00-8.44-19.99c-2.289-2.153-5.81-3.955-10.928-5.71-9.919-3.84-15.67-5.595-31.916-8.954-15.612-3.382-23.265-5.384-36.095-11.352-17.948-8.696-27.49-22.33-29.498-48.816-.446-17.988 5.177-32.933 16.903-44.637C549.933 7.04 566.225.931 587.495.37c35.766-.948 59.724 18.948 70.57 45.503l-24.087 12.956z"></path>
          <path d="M1026.39051 169.336948L1116 277.06864 1095.56439 293.966354 1023.65873 207.596365 974.732864 248.041031 1036.55556 322.281126 1016.0965 339.190526 954.344156 264.938746 894.209776 314.626906 968.073413 403.439234 947.626082 420.336948 856 310.174604z"></path>
          <path d="M1200 717.774l-5.346 25.99L962 776.337l5.792-28.11 61.938-7.602 17.446-84.788-53.931-31.39 5.792-28.11L1200 717.774zm-37.986 5.762l-90.686-53.456-13.753 66.844 104.439-13.388z"></path>
          <path d="M823.208 1113.734c19.121 14.668 37.4 17.268 55.143 7.649 21.307-11.567 28.857-29.979 18.607-48.775-5.131-9.387-12.494-14.342-21.67-14.727-9.466-.233-23.07 1.796-41.117 6.215-16.07 4.08-24.754 5.912-38.02 5.97-19.437.513-32.667-6.623-44.507-26.329-22.288-40.88-8.391-75.279 30.646-96.465 37.4-20.301 75.783-15.007 103.6 18.213l-17.906 21.163c-23.142-24.661-47.593-30.002-73.06-16.184-24.357 13.234-33.252 33.815-20.734 56.727a28.396 28.396 0 0016.585 13.957c2.992.887 6.942.898 12.284.14 10.519-1.072 16.362-2.122 32.351-6.471 15.37-4.046 23.072-5.725 37.155-6.215 19.87-.396 34.538 7.393 48.306 29.99 8.579 15.742 10.402 31.576 5.306 47.236-4.944 15.94-16.632 28.72-35.18 38.794-31.276 16.977-61.56 10.156-83.228-8.512l15.44-22.376z"></path>
          <path d="M378.826 1176.392c-23.339-9.263-38.735-25.883-46.515-49.976-7.86-23.8-4.907-52.806 8.327-86.548 13.233-33.742 30.769-56.958 52.781-69.262 21.897-11.988 44.433-13.556 67.772-4.304 23.338 9.251 38.734 25.882 46.584 49.683 7.744 24.093 4.79 53.11-8.431 86.852-13.222 33.743-30.78 56.958-52.677 69.005-21.909 12.234-44.491 13.801-67.841 4.55zm9.675-24.667c16.035 6.375 31.397 5.006 46.223-4.374 14.687-9.087 27.292-27.485 38.107-55.063 10.814-27.579 14.094-49.683 9.651-66.666-4.558-16.725-14.86-28.272-30.908-34.642-16.048-6.37-31.42-5.03-46.119 4.023-14.791 9.357-27.408 27.777-38.223 55.367-10.815 27.59-14.094 49.66-9.535 66.397 4.453 17.064 14.733 28.608 30.804 34.958z"></path>
          <path d="M8.21039128 742.31435L0 715.860921 211.734262 651.336948 220.648401 680.216441 84.4497388 818.128851 247.789609 768.312892 256 794.789648 44.254009 859.336948 35.351599 830.469119 171.503345 692.510054z"></path>
          <path d="M180.404 255.756c-23.695-4.668-41.23 1.168-52.803 17.672-13.923 19.842-12.438 39.743 5.132 51.999 8.779 6.14 17.593 7.295 25.986 3.56 8.58-4.004 19.873-11.87 34.042-23.87 12.578-10.808 19.522-16.34 31.375-22.258 17.185-9.14 32.206-8.626 51.611 3.77 38.238 26.705 41.172 63.729 15.688 100.087-24.408 34.83-61.161 47.202-100.919 29.799l6.546-26.939c31.762 11.812 56.03 5.73 72.665-18.01 15.91-22.702 14.66-45.089-6.792-60.076a28.44 28.44 0 00-21.042-5.1c-3.074.548-6.616 2.334-11.058 5.345-8.955 5.661-13.76 9.21-26.092 20.205-11.947 10.504-18.085 15.395-30.488 22.106-17.616 9.21-34.228 8.754-56.65-5.369-14.728-10.283-23.379-23.67-25.88-39.976-2.678-16.481 2.069-33.149 14.18-50.423 20.422-29.18 50.593-36.522 78.322-29.426l-3.823 26.904z"></path>
        </g>
      </g>
    </svg>
  )
}
