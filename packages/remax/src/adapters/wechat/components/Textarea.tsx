import React, {
  CSSProperties,
  FunctionComponent,
  useState,
  forwardRef,
} from 'react';
import propsAlias from './propsAlias';
import { BaseProps } from './baseTyping';

export interface TextareaProps extends BaseProps {
  name?: string;
  value: any;
  placeholder?: string;
  placeholderStyle?: CSSProperties;
  placeholderClass?: string;
  disabled?: boolean;
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  /** 是否自动增高，设置auto-height时，style.height不生效 */
  autoHeight?: boolean;
  fixed?: boolean;
  /** 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 */
  cursorSpacing?: number;
  /** 指定focus时的光标位置 */
  cursor?: number;
  /** 是否显示键盘上方带有”完成“按钮那一栏 */
  showConfirmBar?: boolean;
  /** 光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
  selectionStart?: number;
  /** 光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
  selectionEnd?: number;
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean;
  /** focus时，点击页面的时候不收起键盘 */
  holdKeyboard?: boolean;

  onInput?: (...params: any) => void;
  onFocus?: (...params: any) => void;
  onBlur?: (...params: any) => void;
  onConfirm?: (event: any) => any;
  onKeyboardHeightChange?: (event: any) => any;
}

function useInnerFocus(
  initialValue?: boolean
): [boolean, typeof handleInnerFocus] {
  const [innerFocus = false, setInnerFocus] = useState(initialValue);

  const handleInnerFocus = (func?: Function, focus = true) => (
    ...params: any
  ) => {
    if (innerFocus !== focus) {
      setInnerFocus(focus);
    }

    if (typeof func === 'function') {
      return func(...params);
    }
  };

  return [innerFocus, handleInnerFocus];
}

const TextareaRender: FunctionComponent<TextareaProps> = (props, ref) => {
  const {
    autoFocus,
    children,
    focus,
    onInput,
    onClick,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  const [innerFocus, handleInnerFocus] = useInnerFocus(focus || autoFocus);

  const inputProps = propsAlias({
    ...restProps,
    autoFocus,
    focus: innerFocus,
    onInput: handleInnerFocus(onInput),
    onClick: handleInnerFocus(onClick),
    onFocus: handleInnerFocus(onFocus),
    onBlur: handleInnerFocus(onBlur, false),
    ref,
  });

  return React.createElement('textarea', inputProps, children);
};

const Textarea = forwardRef(TextareaRender);

Textarea.defaultProps = {
  maxlength: -1,
  selectionEnd: 999,
  selectionStart: 999,
  fixed: false,
};

export default Textarea;
