export const Icons = {
  loading: ({ ...props }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block animate-spin"
        {...props}
      >
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Languages: ({ ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="13"
        fill="none"
        viewBox="0 0 22 13"
      >
        <path
          fill="#4B4B4B"
          d="m7.15 13-.75-1.2q2.001-.2 3.126-1.075 1.125-.876 1.125-2.25 0-.75-.513-1.375a2.85 2.85 0 0 0-1.337-.9q-.576 1.425-1.363 2.55-.788 1.125-1.737 1.95a16 16 0 0 0 .35 1.2l-1.25.375a15 15 0 0 1-.125-.438 6 6 0 0 0-.1-.337 7.5 7.5 0 0 1-1.225.537 3.6 3.6 0 0 1-1.125.188q-.8 0-1.3-.525t-.5-1.4q0-1.326 1-2.625 1-1.3 2.575-2.05l.05-.938q.024-.462.075-.937a18 18 0 0 1-1.475-.013 49 49 0 0 1-1.675-.112L.95 2.3q.65.125 1.4.162t1.925.038q.05-.45.112-.888a3.5 3.5 0 0 0 .013-.887L5.9.75q-.175.424-.25.862l-.15.863Q6.95 2.4 8.176 2.25t2.3-.4l.025 1.3q-1.325.2-2.588.337a51 51 0 0 1-2.537.213 7 7 0 0 0-.063.725q-.012.374-.062.725.699-.2 1.362-.275t1.313-.025q.075-.25.112-.5t.063-.5l1.425.35q-.075.2-.163.4a3.5 3.5 0 0 0-.162.475q1.275.35 2.037 1.3.763.95.763 2.125 0 1.749-1.288 2.937T7.151 13m-4.7-2.125q.426 0 .876-.175t.95-.525q-.175-.951-.25-1.725a15 15 0 0 1-.075-1.475Q3 7.575 2.376 8.45q-.625.874-.625 1.65 0 .325.212.55.213.225.488.225M5.4 9.25A8.752 8.752 0 0 0 7.55 6q-.574 0-1.162.1a8 8 0 0 0-1.187.3q-.051.65.012 1.35.063.699.188 1.5m11.15 1.4q.701 0 1.363-.325a4.1 4.1 0 0 0 1.213-.925V6.75q-.576.075-1.063.175-.488.099-.912.225-1.125.35-1.688.875t-.562 1.225q0 .65.45 1.025t1.2.375m-.574 1.7q-1.425 0-2.25-.813T12.9 9.325q0-1.3.825-2.125t2.65-1.325q.575-.15 1.262-.275t1.488-.225q-.05-1.176-.55-1.713t-1.55-.537q-.65 0-1.288.237-.637.238-1.637.838l-.8-1.4a7 7 0 0 1 1.937-1.013 6.8 6.8 0 0 1 2.263-.387q1.774 0 2.7 1.1.925 1.1.925 3.2v6.425H19.45L19.3 11q-.7.624-1.538.987a4.45 4.45 0 0 1-1.787.363"
        ></path>
      </svg>
    );
  },
  Cart: ({ ...props }) => {
    return (
      <svg width="17" height="16" {...props} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5002 3.33301L13.1668 7.99967H5.41797" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 2H4.5L5.83333 10.6667H13.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="5.83317" cy="13.3337" rx="0.666667" ry="0.666667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13.1667" cy="13.3337" r="0.666667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.8335 3.66699H11.1668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.5 2V5.33333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

    );
  },
  TemplateEdit: ({ ...props }) => {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <mask
        id="mask0_18505_52105"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_18505_52105)">
        <path
          d="M16.667 5.00065H3.33366V15.0007H10.0003C10.2364 15.0007 10.4344 15.0805 10.5941 15.2402C10.7538 15.4 10.8337 15.5979 10.8337 15.834C10.8337 16.0701 10.7538 16.268 10.5941 16.4277C10.4344 16.5875 10.2364 16.6673 10.0003 16.6673H3.33366C2.87533 16.6673 2.48296 16.5041 2.15658 16.1777C1.83019 15.8513 1.66699 15.459 1.66699 15.0007V5.00065C1.66699 4.54232 1.83019 4.14996 2.15658 3.82357C2.48296 3.49718 2.87533 3.33398 3.33366 3.33398H16.667C17.1253 3.33398 17.5177 3.49718 17.8441 3.82357C18.1705 4.14996 18.3337 4.54232 18.3337 5.00065V10.0007C18.3337 10.2368 18.2538 10.4347 18.0941 10.5944C17.9344 10.7541 17.7364 10.834 17.5003 10.834C17.2642 10.834 17.0663 10.7541 16.9066 10.5944C16.7469 10.4347 16.667 10.2368 16.667 10.0007V5.00065ZM3.33366 5.00065V15.0007V10.834V10.8965V5.00065ZM10.0003 9.16732L16.667 5.00065V6.66732L10.4378 10.5632C10.2989 10.6465 10.1531 10.6882 10.0003 10.6882C9.84755 10.6882 9.70172 10.6465 9.56283 10.5632L3.33366 6.66732V5.00065L10.0003 9.16732ZM15.9795 16.6673H13.3337C13.0975 16.6673 12.8996 16.5875 12.7399 16.4277C12.5802 16.268 12.5003 16.0701 12.5003 15.834C12.5003 15.5979 12.5802 15.4 12.7399 15.2402C12.8996 15.0805 13.0975 15.0007 13.3337 15.0007H15.9795L15.2295 14.2507C15.0628 14.084 14.983 13.8895 14.9899 13.6673C14.9969 13.4451 15.0837 13.2507 15.2503 13.084C15.417 12.9312 15.6114 12.8513 15.8337 12.8444C16.0559 12.8375 16.2503 12.9173 16.417 13.084L18.5837 15.2507C18.667 15.334 18.7295 15.4243 18.7712 15.5215C18.8128 15.6187 18.8337 15.7229 18.8337 15.834C18.8337 15.9451 18.8128 16.0493 18.7712 16.1465C18.7295 16.2437 18.667 16.334 18.5837 16.4173L16.417 18.584C16.2642 18.7368 16.0732 18.8166 15.8441 18.8236C15.6149 18.8305 15.417 18.7507 15.2503 18.584C15.0975 18.4312 15.0212 18.2368 15.0212 18.0007C15.0212 17.7645 15.0975 17.5701 15.2503 17.4173L15.9795 16.6673Z"
          fill="white"
        />
      </g>
    </svg>
    )
  },
  Close: ({ ...props }) => {
    return (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6L18 18" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },
  LastPage: ({ ...props }) => {
    return (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 16L15 12L11 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },
  Laptop: ({ ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        fill="none"
        {...props}
        viewBox="0 0 25 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.467 3h-9.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.875.874c-.218.428-.218.988-.218 2.108v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .875.874c.427.218.987.218 2.108.218h9.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.217-.428.217-.988.217-2.108V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.873-.874C19.147 3 18.587 3 17.467 3M4.34 17.653c.481-.963.722-1.444 1.081-1.796a3 3 0 0 1 1.121-.693C7.018 15 7.556 15 8.633 15H16.7c1.077 0 1.615 0 2.09.164a3 3 0 0 1 1.122.693c.359.352.6.833 1.081 1.796l.516 1.032c.383.766.575 1.15.529 1.461a1 1 0 0 1-.416.674c-.259.18-.687.18-1.544.18H5.255c-.857 0-1.285 0-1.544-.18a1 1 0 0 1-.416-.674c-.046-.312.146-.695.53-1.462zM10.667 18h4"
        ></path>
      </svg>
    );
  },
  Tablet: ({ ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        {...props}
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 18h.01M11 6h2"
        ></path>
        <rect
          width="14"
          height="18"
          x="5"
          y="3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          rx="2"
        ></rect>
      </svg>
    );
  },
  Mobile: ({ ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        fill="none"
        {...props}
        viewBox="0 0 25 24"
      >
        <rect
          width="12"
          height="18"
          x="6.333"
          y="3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          rx="2"
        ></rect>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12.333 18h.01"
        ></path>
      </svg>
    );
  },
  Done: ({ ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        {...props}
        viewBox="0 0 20 20"
      >
        <mask
          id="mask0_7202_38677"
          width="20"
          height="20"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path fill="#D9D9D9" d="M0 0h20v20H0z"></path>
        </mask>
        <g mask="url(#mask0_7202_38677)">
          <path
            fill="#319300"
            d="M1.458 10.875a.76.76 0 0 1-.24-.584.84.84 0 0 1 .261-.583.88.88 0 0 1 .583-.24.76.76 0 0 1 .584.24l3.541 3.542a.76.76 0 0 1 .24.583.84.84 0 0 1-.26.583.88.88 0 0 1-.584.24.76.76 0 0 1-.583-.24zm8.834 1.77 7.083-7.083a.76.76 0 0 1 .583-.24.84.84 0 0 1 .584.261.88.88 0 0 1 .24.583.76.76 0 0 1-.24.584l-7.667 7.666a.8.8 0 0 1-.583.25.8.8 0 0 1-.584-.25l-3.541-3.541a.78.78 0 0 1-.23-.573.85.85 0 0 1 .23-.594.8.8 0 0 1 .593-.25q.344 0 .594.25zm3.52-5.874-2.937 2.937a.78.78 0 0 1-.573.23.85.85 0 0 1-.594-.23.81.81 0 0 1-.25-.594q0-.344.25-.593l2.938-2.938a.78.78 0 0 1 .573-.23q.344 0 .593.23.25.25.25.594t-.25.594"
          ></path>
        </g>
      </svg>
    );
  },
};
