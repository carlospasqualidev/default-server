import { IVariables } from '../types';

export function emailTemplate({ variables }: { variables: IVariables }) {
  return `<div
    style='
      background-size: cover;
      background: #EDEDED;
      padding: 24px;

      '
    >
    <div
      style='
        width: 500px;
          margin: auto;
          background: white;
          border-radius: 32px;
          padding: 24px 0;
      '
    >

      <img
        src='https://larguei.s3.us-west-2.amazonaws.com/logoTextBlack-1669059871498.svg'
        alt=''
        style='
            margin: 0 auto;
            display: block;
            width: 388px;
            height: 87px;
        '
      />

      <div
        style='
            width: 328px;
            margin: 0 auto;
        '
      >

        <h3
          style='
              color:#000000;
              margin: 40px 0 16px;
              text-align: center;
          '
        >
          ${variables.subject}
        </h3>

        <p
          style='
              color:#000000;
              text-align: center;
          '
        >
          ${variables.text}
        </p>

      </div>

      <div
        style='
            margin: 24px auto;
            width: 328px;
        '
      >

        <a
          href='${variables.link}'
          target='__blank'
          style='
            max-width: 328px;
            text-align: center;
            cursor: pointer;
            background: #B21D1D;
            border: none;
            color:white;
            display: block;
            width: 100%;
            height: 40px;
            border-radius: 4px;
            text-decoration: none;
            line-height: 40px;
          '
        >
          Confirmar
        </a>

        <p
          style='
              color: #000000;
              text-align: center;
          '
        >
          (Se o botão não funcionar acesse o link abaixo)
        </p>

        <a
          href='${variables.link}'
          style='
            color:#B21D1D;
            width: 328px;
            cursor: pointer;
            margin: 8px 0 0 0;
            word-break: break-all;
          '
        >
          ${variables.link}
        </a>

      </div>

    </div>
    </div>
  `;
}
