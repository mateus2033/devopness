import React from 'react'

import type { PopoverOrigin } from '@mui/material/Popover'
import Popover from '@mui/material/Popover'
import type { InjectedProps as PopupStateProps } from 'material-ui-popup-state'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import {
  MenuContainer,
  MenuOption,
  Text,
  ClickableContainer,
  ContentBadge,
} from './Dropdown.styled'
import type { Color } from 'src/colors'
import type { ButtonProps } from 'src/components/Buttons'
import { Button } from 'src/components/Buttons'
import { ConditionalWrapper } from 'src/components/helpers'
import { Icon, IconProps } from 'src/components/Primitives/Icon'
import { Link } from 'src/components/Primitives/Link'
import type { TooltipProps } from 'src/components/Primitives/Tooltip'
import { Tooltip } from 'src/components/Primitives/Tooltip'
import type { Unwrap } from 'src/components/types'

const DEFAULT_BUTTON_ICON_SIZE = 10
const DEFAULT_ICON_MARGIN = 10

type DropdownOptionIcon = Unwrap<
  Partial<Pick<IconProps, 'name' | 'size'>> &
    Pick<React.CSSProperties, 'backgroundColor' | 'color'>
> & { icon: true }

type DropdownOptionLetter = Unwrap<
  Pick<React.CSSProperties, 'backgroundColor' | 'color'>
> & {
  icon?: never
}

type DropdownOption = {
  /**
   * Add separator from previous options
   */
  brokenSequence?: boolean
  /**
   * Option Badge configuration
   *
   * An option badge can be an icon or the label's first letter
   */
  badge?: DropdownOptionIcon | DropdownOptionLetter
  /**
   * Option description
   */
  label?: string
  /**
   * Highlight option
   */
  isActive?: boolean
  /**
   * Background Color to use when option is active
   */
  activeBackgroundColor?: Color
  /**
   * Event handler called when this option is clicked.
   */
  onClick?: () => null
  /**
   * Transforms label to a Link and point user to this url
   *
   * @see {Link}
   */
  url?: string
  /**
   * Disables option
   */
  isDisabled?: boolean
  /**
   * Tooltip's title
   *
   * @see {Tooltip}
   */
  tooltip?: TooltipProps['title']
  /**
   * Label text color
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color}
   */
  color?: Color
}

type DropdownSharedProps = {
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   *
   * help: https://mui.com/material-ui/react-popover/#anchor-playground
   */
  anchorOrigin?: PopoverOrigin
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   *
   * help: https://mui.com/material-ui/react-popover/#anchor-playground
   */
  transformOrigin?: PopoverOrigin
  /**
   * The unique id to identify the dropdown anchor element.
   */
  id: string
  /**
   * Options listed in the Dropdown menu popup.
   *
   * @see {DropdownOption}
   */
  options: DropdownOption[] | undefined
  /**
   * Event handler called when the dropdown is opened or closed.
   */
  onToggle?: (popupState: PopupStateProps) => void
  /**
   * Event handler called when a dropdown option is selected.
   *
   * This prop can be overriden using option.onClick
   *
   * @see {DropdownOption}
   */
  onSelect?: (itemClicked: DropdownOption) => void
  /**
   * Tooltip's title
   *
   * @see {Tooltip}
   */
  tooltip?: TooltipProps['title']
}

type DropdownVariationButtonProps = DropdownSharedProps & {
  /**
   * Anchors dropdown to Button
   *
   * @see {Button}
   */
  anchorType: 'button'
  /**
   * Hide dropdown arrow icon
   */
  hideDropdownIcon?: boolean
  /**
   * Hide dropdown label text
   */
  hideLabel?: boolean
  /**
   * Button properties
   *
   * @see {Button}
   */
  buttonProps?: ButtonProps
  /**
   * Button label
   *
   * Default value: 'Open Popover'
   */
  label?: string | React.JSX.Element
  content?: never
}

type DropdownVariationContainerProps = DropdownSharedProps & {
  /**
   * Anchors dropdown to React.ReactNode content element
   *
   * @see {React.ReactNode}
   */
  anchorType: 'content'
  /**
   * Element to be used as anchor, to toggle dropdown when clicked.
   */
  content: React.ReactNode
}

type DropdownProps =
  | DropdownVariationContainerProps
  | DropdownVariationButtonProps

type ElementAnchorProps = {
  popupTrigger: object
  popupState: PopupStateProps
} & Pick<DropdownProps, 'anchorType'> &
  Pick<
    DropdownVariationButtonProps,
    'tooltip' | 'buttonProps' | 'hideDropdownIcon' | 'hideLabel' | 'label'
  > &
  Pick<DropdownVariationContainerProps, 'content'>

const ElementAnchor = ({
  popupTrigger,
  popupState,
  buttonProps,
  content,
  tooltip,
  ...props
}: ElementAnchorProps) => {
  if (props.anchorType === 'content') {
    return <ClickableContainer {...popupTrigger}>{content}</ClickableContainer>
  }

  const dropdownIcon = popupState.isOpen ? 'upArrow' : 'downArrow'

  return (
    <ConditionalWrapper
      condition={!!tooltip}
      wrapper={(children) => <Tooltip title={tooltip}>{children}</Tooltip>}
    >
      <Button
        noMargin
        noIconMargin={!!buttonProps?.icon}
        typeSize="medium"
        {...buttonProps}
        icon={!props.hideDropdownIcon ? dropdownIcon : undefined}
        {...popupTrigger}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: DEFAULT_ICON_MARGIN,
          }}
        >
          <Icon
            name={buttonProps?.icon}
            size={buttonProps?.iconSize ?? DEFAULT_BUTTON_ICON_SIZE}
          />
          {!props.hideLabel ? (props.label ?? 'Open Popover') : null}
        </div>
      </Button>
    </ConditionalWrapper>
  )
}

/**
 * Display a menu with a list of options
 */
const Dropdown = ({
  onToggle,
  onSelect,
  content,
  anchorType,
  ...props
}: DropdownProps) => (
  <PopupState
    variant="popover"
    popupId="demo-popup-popover"
  >
    {(popupState: PopupStateProps) => {
      if (popupState.anchorEl) {
        onToggle?.(popupState)
      }

      return (
        <React.Fragment>
          <ElementAnchor
            {...props}
            popupTrigger={{ ...bindTrigger(popupState) }}
            popupState={popupState}
            content={content}
            anchorType={anchorType}
          />
          <Popover
            slotProps={{
              paper: {
                style: {
                  marginTop: '10px',
                  backgroundColor: '#FFF',
                  width: '200px',
                  borderRadius: '8px',
                  boxShadow: '0 0 30px 0px rgba(0,0,0,0.15)',
                },
              },
            }}
            {...bindPopover(popupState)}
            {...props}
          >
            {props.options && (
              <MenuContainer id={props.id}>
                {props.options.map((option, index) => (
                  <Tooltip
                    title={option.tooltip ?? ''}
                    key={index}
                  >
                    <ConditionalWrapper
                      condition={!!option.url}
                      wrapper={(children) => (
                        <Link
                          to={option.url}
                          style={{ display: 'block', marginRight: 'auto' }}
                          hideUnderline
                        >
                          {children}
                        </Link>
                      )}
                    >
                      <MenuOption
                        id={`option_${index.toString()}`}
                        disabled={option.isDisabled}
                        key={`option${index.toString()}`}
                        isActive={option.isActive}
                        activeBackgroundColor={option.activeBackgroundColor}
                        brokenSequence={option.brokenSequence}
                        onClick={(event) => {
                          if (option.isDisabled) {
                            return
                          }

                          event.preventDefault()
                          event.stopPropagation()

                          if (option.onClick) {
                            option.onClick()
                          } else if (onSelect) {
                            onSelect(option)
                          }

                          popupState.close()
                        }}
                      >
                        {option.badge && (
                          <ContentBadge
                            backgroundColor={option.badge.backgroundColor}
                          >
                            {option.badge.icon ? (
                              <Icon
                                name={option.badge.name}
                                size={option.badge.size ?? 12}
                              />
                            ) : (
                              option.label?.at(0)
                            )}
                          </ContentBadge>
                        )}
                        {option.label && (
                          <Tooltip
                            title={option.label}
                            enableOnlyWithEllipsisPoints
                          >
                            <Text color={option.color}>{option.label}</Text>
                          </Tooltip>
                        )}
                      </MenuOption>
                    </ConditionalWrapper>
                  </Tooltip>
                ))}
              </MenuContainer>
            )}
          </Popover>
        </React.Fragment>
      )
    }}
  </PopupState>
)

export type { DropdownOption, DropdownProps }
export { Dropdown }
