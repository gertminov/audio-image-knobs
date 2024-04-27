import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const robotic: CustomThemeConfig = {
	name: 'robotic',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-family-heading': `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '0px',
		'--theme-rounded-container': '0px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #084C61
		'--color-primary-50': '218 228 231', // #dae4e7
		'--color-primary-100': '206 219 223', // #cedbdf
		'--color-primary-200': '193 210 216', // #c1d2d8
		'--color-primary-300': '156 183 192', // #9cb7c0
		'--color-primary-400': '82 130 144', // #528290
		'--color-primary-500': '8 76 97', // #084C61
		'--color-primary-600': '7 68 87', // #074457
		'--color-primary-700': '6 57 73', // #063949
		'--color-primary-800': '5 46 58', // #052e3a
		'--color-primary-900': '4 37 48', // #042530
		// secondary | #832161
		'--color-secondary-50': '236 222 231', // #ecdee7
		'--color-secondary-100': '230 211 223', // #e6d3df
		'--color-secondary-200': '224 200 216', // #e0c8d8
		'--color-secondary-300': '205 166 192', // #cda6c0
		'--color-secondary-400': '168 100 144', // #a86490
		'--color-secondary-500': '131 33 97', // #832161
		'--color-secondary-600': '118 30 87', // #761e57
		'--color-secondary-700': '98 25 73', // #621949
		'--color-secondary-800': '79 20 58', // #4f143a
		'--color-secondary-900': '64 16 48', // #401030
		// tertiary | #56A3A6
		'--color-tertiary-50': '230 241 242', // #e6f1f2
		'--color-tertiary-100': '221 237 237', // #ddeded
		'--color-tertiary-200': '213 232 233', // #d5e8e9
		'--color-tertiary-300': '187 218 219', // #bbdadb
		'--color-tertiary-400': '137 191 193', // #89bfc1
		'--color-tertiary-500': '86 163 166', // #56A3A6
		'--color-tertiary-600': '77 147 149', // #4d9395
		'--color-tertiary-700': '65 122 125', // #417a7d
		'--color-tertiary-800': '52 98 100', // #346264
		'--color-tertiary-900': '42 80 81', // #2a5051
		// success | #2FC675
		'--color-success-50': '224 246 234', // #e0f6ea
		'--color-success-100': '213 244 227', // #d5f4e3
		'--color-success-200': '203 241 221', // #cbf1dd
		'--color-success-300': '172 232 200', // #ace8c8
		'--color-success-400': '109 215 158', // #6dd79e
		'--color-success-500': '47 198 117', // #2FC675
		'--color-success-600': '42 178 105', // #2ab269
		'--color-success-700': '35 149 88', // #239558
		'--color-success-800': '28 119 70', // #1c7746
		'--color-success-900': '23 97 57', // #176139
		// warning | #E3B505
		'--color-warning-50': '251 244 218', // #fbf4da
		'--color-warning-100': '249 240 205', // #f9f0cd
		'--color-warning-200': '248 237 193', // #f8edc1
		'--color-warning-300': '244 225 155', // #f4e19b
		'--color-warning-400': '235 203 80', // #ebcb50
		'--color-warning-500': '227 181 5', // #E3B505
		'--color-warning-600': '204 163 5', // #cca305
		'--color-warning-700': '170 136 4', // #aa8804
		'--color-warning-800': '136 109 3', // #886d03
		'--color-warning-900': '111 89 2', // #6f5902
		// error | #DB504A
		'--color-error-50': '250 229 228', // #fae5e4
		'--color-error-100': '248 220 219', // #f8dcdb
		'--color-error-200': '246 211 210', // #f6d3d2
		'--color-error-300': '241 185 183', // #f1b9b7
		'--color-error-400': '230 133 128', // #e68580
		'--color-error-500': '219 80 74', // #DB504A
		'--color-error-600': '197 72 67', // #c54843
		'--color-error-700': '164 60 56', // #a43c38
		'--color-error-800': '131 48 44', // #83302c
		'--color-error-900': '107 39 36', // #6b2724
		// surface | #cccccc
		'--color-surface-50': '247, 247, 247', // #F7F7F7
		'--color-surface-100': '242, 242, 242', // #F2F2F2
		'--color-surface-200': '232, 232, 232', // #E8E8E8
		'--color-surface-300': '224, 224, 224', // #E0E0E0
		'--color-surface-400': '214, 214, 214', // #D6D6D6
		'--color-surface-500': '204, 204, 204', // #CCCCCC
		'--color-surface-600': '163, 163, 163', // #A3A3A3
		'--color-surface-700': '122, 122, 122', // #7A7A7A
		'--color-surface-800': '82, 82, 82', // #525252
		'--color-surface-900': '41, 41, 41' // #292929
	}
};
